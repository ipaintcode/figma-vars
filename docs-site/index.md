---
layout: home
hero:
  name: Figma Variables
  text: Modern library for working with Figma variables
  tagline: Seamlessly integrate Figma variables into your React applications
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/ipaintcode/figma-vars

features:
  - icon: 🎨
    title: Figma Integration
    details: Direct integration with Figma's variable system
  - icon: ⚛️
    title: React Support
    details: First-class React support with hooks and components
  - icon: 🔒
    title: Secure
    details: Built with security best practices in mind
  - icon: 🚀
    title: Modern
    details: Built for modern JavaScript and TypeScript applications
---

<div class="author-signature">
  <div class="signature-container">
    <div class="signature-content">
      <div class="signature-text-wrapper">
        <span class="signature-text">Developed by</span>
      </div>
      <a href="https://github.com/ipaintcode" target="_blank" rel="noopener" class="signature-name">
        <span class="name-part">Mark</span>
        <span class="name-part">Learst</span>
      </a>
    </div>
  </div>
</div>

<style>
/* Page content animation */
:root {
  --animation-duration: 0.8s;
  --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hero section animations */
.VPHero {
  opacity: 0;
  animation: sectionReveal var(--animation-duration) var(--animation-timing) forwards;
  animation-delay: 0.3s;
}

.VPHero .container {
  text-align: left;
}

.VPHero .name {
  font-size: 4rem;
  line-height: 1.4;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  transform: translateY(20px);
  animation: elementReveal var(--animation-duration) var(--animation-timing) forwards;
  animation-delay: 0.5s;
}

.VPHero .text {
  font-size: 1.8rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: elementReveal var(--animation-duration) var(--animation-timing) forwards;
  animation-delay: 0.7s;
  max-width: calc(100% - 50px);
}

.VPHero .tagline {
  font-size: 1.4rem;
  line-height: 1.8;
  opacity: 0;
  transform: translateY(20px);
  animation: elementReveal var(--animation-duration) var(--animation-timing) forwards;
  animation-delay: 0.9s;
  max-width: calc(100% - 50px);
}

.VPHero .actions {
  opacity: 0;
  transform: translateY(20px);
  animation: elementReveal var(--animation-duration) var(--animation-timing) forwards;
  animation-delay: 1.1s;
}

/* Features section animations */
.VPFeatures {
  opacity: 0;
  transform: translateY(30px);
  animation: sectionReveal var(--animation-duration) var(--animation-timing) forwards;
  animation-delay: 1.3s;
}

.VPFeatures .item {
  opacity: 0;
  transform: translateY(20px);
  animation: elementReveal var(--animation-duration) var(--animation-timing) forwards;
}

.VPFeatures .item:nth-child(1) {
  animation-delay: 1.5s;
}

.VPFeatures .item:nth-child(2) {
  animation-delay: 1.7s;
}

.VPFeatures .item:nth-child(3) {
  animation-delay: 1.9s;
}

.VPFeatures .item:nth-child(4) {
  animation-delay: 2.1s;
}

/* Author signature */
.author-signature {
  display: flex;
  justify-content: center;
  margin: 4rem 0 2rem;
  perspective: 1000px;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  opacity: 0;
  transform: translateY(30px);
  animation: sectionReveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 2.3s;
}

.author-signature::before {
  content: '';
  position: absolute;
  width: 300%;
  height: 300%;
  background:
    radial-gradient(circle at 30% 30%, rgba(var(--vp-c-brand-rgb), 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(var(--vp-c-brand-rgb), 0.15) 0%, transparent 50%);
  animation: ambientLight 15s ease-in-out infinite;
  pointer-events: none;
}

.signature-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  background: var(--vp-c-bg);
  border-radius: 16px;
  box-shadow: none;
  transform-style: preserve-3d;
  animation: containerFloat 8s ease-in-out infinite;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.signature-container::before {
  display: none;
}

.signature-container::after {
  display: none;
}

.signature-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.signature-text-wrapper {
  position: relative;
  overflow: hidden;
  padding: 0.5rem 0;
}

.signature-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(20px);
  animation: textReveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 2.5s;
  position: relative;
  display: inline-block;
}

.signature-text::after {
  display: none;
}

.signature-name {
  display: flex;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--vp-c-brand);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: nameReveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 2.7s;
}

.name-part {
  position: relative;
  display: inline-block;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.name-part::before {
  display: none;
}

.name-part::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    var(--vp-c-brand),
    transparent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.signature-name:hover .name-part {
  transform: translateY(-4px);
  text-shadow: none;
}

.signature-name:hover .name-part::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Animation keyframes */
@keyframes sectionReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes elementReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes containerFloat {
  0%, 100% {
    transform: translateY(0) rotateX(0) scale(1);
  }
  50% {
    transform: translateY(-10px) rotateX(2deg) scale(1.02);
  }
}

@keyframes ambientLight {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.8;
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 0%, 0% 0%;
  }
  100% {
    background-position: 200% 0%, 0% 200%;
  }
}

@keyframes borderGlow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}

@keyframes lineReveal {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes nameReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media (max-width: 640px) {
  .VPHero .name {
    font-size: 3rem;
  }

  .VPHero .text {
    font-size: 1.5rem;
  }

  .VPHero .tagline {
    font-size: 1.2rem;
  }

  .VPHero .actions {
    flex-direction: column;
    gap: 1rem;
  }

  .signature-container {
    padding: 1.5rem;
  }

  .signature-name {
    font-size: 1.4rem;
  }

  .signature-text {
    font-size: 0.8rem;
  }
}
</style>
