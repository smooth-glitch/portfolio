"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
  JSX,
} from "react";
import { gsap } from "gsap";
import styles from "./TextType.module.css";

type VariableSpeed = { min: number; max: number } | undefined;

type TextTypeProps = React.HTMLAttributes<HTMLElement> & {
  text: string | string[];
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: VariableSpeed;
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;

  /** NEW: type everything once (no deleting between items) */
  continuous?: boolean;
  /** NEW: used when continuous=true to join lines (default: newline) */
  separator?: string;
};

export default function TextType({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "_",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,

  // NEW
  continuous = false,
  separator = "\n",

  ...props
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const baseArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  // NEW: when continuous, treat everything as a single string
  const effectiveArray = useMemo(() => {
    if (!continuous) return baseArray;
    return [baseArray.join(separator)];
  }, [baseArray, continuous, separator]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return undefined;
    return textColors[currentTextIndex % textColors.length];
  };

  // Start animation when visible (optional)
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const el = containerRef.current;

    // If it's already in view (even if height ~0), start immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // start only once
            break;
          }
        }
      },
      {
        threshold: 0, // be permissive (not 0.1)
        rootMargin: "0px 0px -10% 0", // trigger a bit earlier
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Cursor blink
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  // Typing logic (with continuous support)
  useEffect(() => {
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const currentText = effectiveArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;
    const isLastItem = currentTextIndex === effectiveArray.length - 1;

    const run = () => {
      if (isDeleting) {
        // non-continuous delete behavior only
        if (displayedText === "") {
          setIsDeleting(false);
          onSentenceComplete?.(
            effectiveArray[currentTextIndex],
            currentTextIndex
          );

          if (isLastItem && !loop) return;

          setCurrentTextIndex((prev) => (prev + 1) % effectiveArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex]
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else {
          // reached end of this item
          onSentenceComplete?.(
            effectiveArray[currentTextIndex],
            currentTextIndex
          );

          if (continuous) {
            // DONE (continuous types once)
            if (!loop) return;
            // if loop=true, restart whole block after pause
            timeout = setTimeout(() => {
              setDisplayedText("");
              setCurrentCharIndex(0);
              setCurrentTextIndex(0);
            }, pauseDuration);
          } else {
            // original behavior: cycle items by deleting then typing next
            if (effectiveArray.length > 1) {
              timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
            }
          }
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(run, initialDelay);
    } else {
      run();
    }

    return () => timeout && clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    effectiveArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    continuous,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < effectiveArray[currentTextIndex].length || isDeleting);

  return createElement(
    Component as any,
    {
      ref: containerRef as any,
      className: `${styles.textType} ${className}`.trim(),
      ...props,
    },
    <>
      <span
        className={styles.textTypeContent}
        style={{
          color: getCurrentTextColor() || "inherit",
          whiteSpace: "pre-wrap",
        }}
      >
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`${styles.textTypeCursor} ${cursorClassName} ${
            shouldHideCursor ? styles.textTypeCursorHidden : ""
          }`.trim()}
          aria-hidden="true"
        >
          {cursorCharacter}
        </span>
      )}
    </>
  );
}
