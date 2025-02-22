import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { SiGithub, SiLinkedin, SiBehance, SiDribbble } from "react-icons/si";

const roles = ["Frontend Development", "UI/UX Designer", "Problem Solver"];

const socialLinks = [
  { icon: SiGithub, href: "https://github.com/mehdi1914", label: "GitHub" },
  { icon: SiLinkedin, href: "https://www.linkedin.com/in/mehdi-khatiri/", label: "LinkedIn" },
  { icon: SiBehance, href: "https://www.behance.net/mehdikhatiri1", label: "Behance" },
  { icon: SiDribbble, href: "https://dribbble.com/MEHDI_UXUI", label: "Dribbble" }
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex < roles[roleIndex].length) {
        currentText = roles[roleIndex].substring(0, currentIndex + 1);
        setDisplayText(currentText);
        currentIndex++;
        timeoutId = setTimeout(typeText, 50); // Faster typing speed
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          currentIndex = 0;
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    };

    if (isTyping) {
      typeText();
    }

    return () => clearTimeout(timeoutId);
  }, [roleIndex, isTyping]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Animated Background */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          initial={{ 
            width: `${(i + 1) * 300}px`,
            height: `${(i + 1) * 300}px`,
            x: -150,
            y: -150,
            opacity: 0.1
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${i * 20}%`,
            top: `${i * 25}%`,
            zIndex: 0
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={0}
          >
            Hi, I'm{" "}
            <motion.span 
              className="bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text"
            >
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-400 mb-8"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            Building Founder-Focused Digital Experiences
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center mb-12"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                const element = document.querySelector('#portfolio');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Let's Connect
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="w-6 h-6" />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}