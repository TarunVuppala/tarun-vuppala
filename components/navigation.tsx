"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Github, Linkedin, Twitter, Mail, Menu, X, Sun, Moon, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import DevConsole from "@/components/DevConsole"
import Image from "next/image"
import ContentContainer from "@/components/layout/container"

const NAV_ITEMS = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/#about" },
	{ name: "Projects", href: "/#projects" },
	{ name: "Contact", href: "/#contact" },
]

const SOCIAL_LINKS = [
	{ icon: Github, href: "https://github.com/tarunvuppala", label: "GitHub" },
	{ icon: Linkedin, href: "https://linkedin.com/in/tarun26", label: "LinkedIn" },
	{ icon: Twitter, href: "https://x.com/tarunvuppala", label: "Twitter" },
	{ icon: Mail, href: "mailto:tarun.vuppala26@gmail.com", label: "Email" },
]

export default function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [showConsole, setShowConsole] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const navRef = useRef<HTMLElement>(null)
	const pathname = usePathname()
	const router = useRouter()
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		const updateNavHeight = () => {
			if (navRef.current) {
				const height = navRef.current.getBoundingClientRect().height
				document.documentElement.style.setProperty("--nav-height", `${height}px`)
			}
		}
		updateNavHeight()
		window.addEventListener("resize", updateNavHeight)
		return () => window.removeEventListener("resize", updateNavHeight)
	}, [])

	const handleNavClick = (href: string) => {
		if (href.includes("#")) {
			const [path, hash] = href.split("#")
			if (path && path !== pathname) {
				router.push(href)
			} else if (hash) {
				const element = document.getElementById(hash)
				if (element) {
					element.scrollIntoView({ behavior: "smooth" })
				}
			}
		} else {
			router.push(href)
		}
		setIsMobileMenuOpen(false)
	}

	const isDarkMode = isMounted ? resolvedTheme === "dark" : true
	const toggleTheme = () => {
		setTheme(isDarkMode ? "light" : "dark")
	}

	return (
		<>
			<motion.nav
				ref={navRef}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="fixed left-0 right-0 top-0 z-50 pt-1.5"
			>
				<ContentContainer>
					<div
						className={`relative transition-all duration-500 ${isScrolled
							? "border border-border/70 bg-background/94 shadow-sm"
							: "border border-border/50 bg-background/82"
							} rounded-[1.4rem]`}
					>

						<div className="relative px-4 py-2 sm:px-5">
							<div className="flex items-center justify-between">
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
									<button onClick={() => handleNavClick("/")} className="text-xl sm:text-2xl font-bold" aria-label="Go to homepage">
										<motion.span className="text-foreground">
											<Image src="/main.png" alt="Tarun Vuppala" width={40} height={40} sizes="40px" draggable={false} />
										</motion.span>
									</button>
								</motion.div>

								{/* Desktop Navigation */}
								<div className="hidden md:flex items-center space-x-1">
									{NAV_ITEMS.map((item, index) => (
										<motion.div
											key={item.name}
											initial={{ opacity: 0, y: -20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.1, duration: 0.5 }}
											className="relative"
										>
											<Button
												variant="ghost"
												onClick={() => handleNavClick(item.href)}
												className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/76 transition-colors hover:bg-transparent hover:text-foreground"
											>
												{item.name}
											</Button>
										</motion.div>
									))}
								</div>

								{/* Desktop icons */}
								<div className="hidden md:flex items-center space-x-1">
									<motion.div
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.5 }}
									>
										<Button
											variant="ghost"
											size="sm"
											onClick={toggleTheme}
											className="h-8 w-8 rounded-md p-0 text-foreground/70 transition-colors hover:bg-transparent hover:text-foreground"
											title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
											aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
										>
											<Sun className={`h-4 w-4 transition-all ${isDarkMode ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
											<Moon className={`absolute h-4 w-4 transition-all ${isDarkMode ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
										</Button>
									</motion.div>
									<motion.div
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.6 }}
									>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => setShowConsole(true)}
											className="h-8 w-8 rounded-md p-0 text-foreground/70 transition-colors hover:bg-transparent hover:text-foreground"
											title="Dev Console"
										>
											<Terminal className="h-4 w-4" />
										</Button>
									</motion.div>
									<div className="mx-2 h-6 w-px bg-border" />
									<div className="flex items-center space-x-1">
										{SOCIAL_LINKS.map((social, index) => (
											<motion.a
												key={social.label}
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												initial={{ opacity: 0, scale: 0 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: 0.7 + index * 0.1 }}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												className="rounded-md p-2 text-foreground/58 transition-colors duration-300 hover:text-foreground"
											>
												<social.icon size={16} />
											</motion.a>
										))}
									</div>
								</div>

								{/* Mobile icons only */}
								<div className="flex items-center gap-2 md:hidden">
									<Button
										variant="ghost"
										size="sm"
										onClick={toggleTheme}
										className="h-8 w-8 rounded-md p-0 text-foreground/70 hover:bg-transparent hover:text-foreground"
										title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
										aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
									>
										<Sun className={`h-4 w-4 transition-all ${isDarkMode ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
										<Moon className={`absolute h-4 w-4 transition-all ${isDarkMode ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 w-8 rounded-md p-0 text-foreground/70 hover:bg-transparent hover:text-foreground"
										onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
									>
										<AnimatePresence mode="wait">
											{isMobileMenuOpen ? (
												<motion.div
													key="close"
													initial={{ rotate: -90, opacity: 0 }}
													animate={{ rotate: 0, opacity: 1 }}
													exit={{ rotate: 90, opacity: 0 }}
													transition={{ duration: 0.2 }}
												>
													<X size={18} />
												</motion.div>
											) : (
												<motion.div
													key="menu"
													initial={{ rotate: 90, opacity: 0 }}
													animate={{ rotate: 0, opacity: 1 }}
													exit={{ rotate: -90, opacity: 0 }}
													transition={{ duration: 0.2 }}
												>
													<Menu size={18} />
												</motion.div>
											)}
										</AnimatePresence>
									</Button>
								</div>
							</div>

							{/* Mobile Menu */}
							<AnimatePresence>
								{isMobileMenuOpen && (
									<motion.div
										initial={{ opacity: 0, height: 0, y: -10 }}
										animate={{ opacity: 1, height: "auto", y: 0 }}
										exit={{ opacity: 0, height: 0, y: -10 }}
										transition={{ duration: 0.3, ease: "easeOut" }}
										className="md:hidden mt-6 overflow-hidden"
									>
										<div className="space-y-2 border-t border-foreground/10 pt-4">
											{NAV_ITEMS.map((item, index) => (
												<motion.div
													key={item.name}
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: index * 0.1 }}
												>
													<button
														type="button"
														onClick={() => handleNavClick(item.href)}
														className={`block px-1 py-3 text-left font-medium transition-colors duration-300 ${pathname === item.href
															? "text-foreground"
															: "text-foreground/70 hover:text-foreground"
															}`}
													>
														{item.name}
													</button>
												</motion.div>
											))}
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.4 }}
												className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-4"
											>
												<div className="flex space-x-2">
													{SOCIAL_LINKS.map((social) => (
														<a
															key={social.label}
															href={social.href}
															target="_blank"
															rel="noopener noreferrer"
															className="rounded-md p-2 text-foreground/60 transition-colors duration-300 hover:text-foreground"
														>
															<social.icon size={16} />
														</a>
													))}
												</div>
												<div className="flex items-center space-x-2">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => setShowConsole(true)}
														className="h-9 w-9 rounded-md p-0 text-foreground/70 hover:bg-transparent hover:text-foreground"
														title="Dev Console"
													>
														<Terminal className="h-4 w-4" />
													</Button>
												</div>

											</motion.div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</ContentContainer>
			</motion.nav>

			<DevConsole isOpen={showConsole} onClose={() => setShowConsole(false)} />
		</>
	)
}
