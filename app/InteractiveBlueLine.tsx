
"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBlueLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const smoothPointer = {
      x: -1000,
      y: -1000,
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;

      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handlePointerMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    resize();

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.09;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.09;

      const baseX = width * 0.58;
      const segments = 180;
      const timeOffset = time * 0.00045;

      const points: { x: number; y: number }[] = [];

      for (let i = 0; i <= segments; i++) {
        const progress = i / segments;
        const y = progress * height;

        // Natural flowing movement
        const flow =
          Math.sin(progress * 8 + timeOffset) * 18 +
          Math.sin(progress * 17 - timeOffset * 0.7) * 7;

        let displacement = flow;

        if (pointer.active) {
          const distanceY = y - smoothPointer.y;
          const distanceX = baseX - smoothPointer.x;

          const distance = Math.sqrt(
            distanceY * distanceY + distanceX * distanceX
          );

          // Touch/mouse creates a soft liquid deformation
          const influence = Math.exp(-(distance * distance) / 18000);

          const ripple =
            Math.sin(distanceY * 0.045 - timeOffset * 3) *
            influence *
            110;

          displacement +=
            (smoothPointer.x - baseX) * influence * 0.65 +
            ripple;
        }

        points.push({
          x: baseX + displacement,
          y,
        });
      }

      function drawRibbon(
        color: string,
        lineWidth: number,
        blur: number
      ) {
        ctx!.beginPath();

        points.forEach((point, index) => {
          if (index === 0) {
            ctx!.moveTo(point.x, point.y);
          } else {
            ctx!.lineTo(point.x, point.y);
          }
        });

        ctx!.strokeStyle = color;
        ctx!.lineWidth = lineWidth;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.shadowColor = "#087bff";
        ctx!.shadowBlur = blur;
        ctx!.stroke();
      }

      // Wide soft blue glow
      drawRibbon("rgba(0, 80, 255, 0.10)", 34, 35);

      // Main luminous blue ribbon
      drawRibbon("rgba(15, 100, 255, 0.35)", 12, 22);

      // Bright cyan core
      drawRibbon("rgba(65, 190, 255, 0.85)", 2, 14);

      // Fine white-blue highlight
      drawRibbon("rgba(180, 235, 255, 0.55)", 0.7, 8);

      animationFrame = requestAnimationFrame(draw);
    }

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
