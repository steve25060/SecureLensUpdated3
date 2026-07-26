"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DemoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoImages = [
  { id: 1, title: "Meet SecureLens", src: "/demo-gallery/S1.png" },
  { id: 2, title: "Create Your Account", src: "/demo-gallery/S2.png" },
  { id: 3, title: "Dashboard Overview", src: "/demo-gallery/S3.png" },
  { id: 4, title: "Security Workspaces", src: "/demo-gallery/S4.png" },
  { id: 5, title: "Workspace Details", src: "/demo-gallery/S5.png" },
  { id: 6, title: "Select Analysis Mode", src: "/demo-gallery/S6.png" },
  { id: 7, title: "Configure Security Engines", src: "/demo-gallery/S7.png" },
  { id: 8, title: "Review & Confirm", src: "/demo-gallery/S8.png" },
  { id: 9, title: "Workspace Created", src: "/demo-gallery/S9.png" },
  { id: 10, title: "Configure Live Scan", src: "/demo-gallery/S10.png" },
  { id: 11, title: "Scan Configuration Step 2", src: "/demo-gallery/S11.png" },
  { id: 12, title: "Scan Configuration Step 3", src: "/demo-gallery/S12.png" },
  { id: 13, title: "Scan Review", src: "/demo-gallery/S13.png" },
  { id: 14, title: "Scan Started", src: "/demo-gallery/S14.png" },
  { id: 15, title: "Scan Progress", src: "/demo-gallery/S15.png" },
  { id: 16, title: "Findings Overview", src: "/demo-gallery/S16.png" },
  { id: 17, title: "Security Analysis", src: "/demo-gallery/S17.png" },
  { id: 18, title: "Detailed Findings", src: "/demo-gallery/S18.png" },
  { id: 19, title: "Final Report", src: "/demo-gallery/S19.png" },
];

export default function DemoGallery({ isOpen, onClose }: DemoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev - 1 + demoImages.length) % demoImages.length);
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev + 1) % demoImages.length);
  };

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(index);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col"
          style={{
            background: '#030614'
          }}
          onClick={handleBackdropClick}
        >
          {/* Background effects matching hero */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(111,45,255,0.15),transparent_30%),radial-gradient(circle_at_72%_96%,rgba(91,33,182,0.25),transparent_36%),radial-gradient(circle_at_12%_64%,rgba(79,70,229,0.08),transparent_32%)]" />
          <div className="absolute inset-0 opacity-[0.01] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:96px_96px]" />

          {/* Header with close button */}
          <div className="relative z-10 flex items-center justify-between p-4 md:p-6 border-b border-violet-500/20 bg-gradient-to-b from-violet-500/5 to-transparent">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {demoImages[currentIndex].title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 mt-1">
                Image {currentIndex + 1} / {demoImages.length}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 md:p-3 hover:bg-white/10 rounded-lg transition-colors ml-4"
              type="button"
            >
              <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>
          </div>

          {/* Main image display - Fullscreen scrollable */}
          <div className="relative z-10 flex-1 overflow-auto flex items-center justify-center w-full">
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <img
                src={demoImages[currentIndex].src}
                alt={demoImages[currentIndex].title}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Footer with controls */}
          <div className="relative z-10 border-t border-violet-500/20 p-4 md:p-6 bg-gradient-to-t from-violet-500/5 to-transparent space-y-4">
            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={goToPrevious}
                onMouseDown={(e) => e.preventDefault()}
                className="p-3 md:p-4 hover:bg-violet-500/30 rounded-lg transition-all duration-200 hover:scale-110"
                type="button"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-violet-300" />
              </button>

              <div className="text-center">
                <p className="text-white font-semibold">
                  {currentIndex + 1} / {demoImages.length}
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  Use arrow keys to navigate
                </p>
              </div>

              <button
                onClick={goToNext}
                onMouseDown={(e) => e.preventDefault()}
                className="p-3 md:p-4 hover:bg-violet-500/30 rounded-lg transition-all duration-200 hover:scale-110"
                type="button"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-violet-300" />
              </button>
            </div>

            {/* Thumbnail strip - Horizontal scrollable */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-2 justify-center md:justify-start">
                {demoImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => goToSlide(index, e)}
                    onMouseDown={(e) => e.preventDefault()}
                    className={`flex-shrink-0 relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                      index === currentIndex
                        ? "border-violet-400 opacity-100 scale-105"
                        : "border-violet-500/30 opacity-50 hover:opacity-75"
                    }`}
                    type="button"
                    title={`Go to image ${index + 1}`}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
