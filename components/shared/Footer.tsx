import { Facebook, Instagram, Twitter } from "lucide-react"
import React from 'react'
import { Button } from "../ui/button"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="pt-10">
            <footer className="bg-muted border-t">
                <div className="custom-container py-12 md:py-16">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Wanderlust</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Creating extraordinary experiences and unforgettable memories since 2010.
                            </p>
                            <div className="mt-4 flex space-x-4">
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Services</h3>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li>
                                    <Link href="#stay" className="text-muted-foreground hover:text-foreground">
                                        STAY
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#adventure" className="text-muted-foreground hover:text-foreground">
                                        ADVENTURE
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#culinary" className="text-muted-foreground hover:text-foreground">
                                        CULINARY
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#wellness" className="text-muted-foreground hover:text-foreground">
                                        WELLNESS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#holidays" className="text-muted-foreground hover:text-foreground">
                                        HOLIDAYS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#seasons" className="text-muted-foreground hover:text-foreground">
                                        SEASONS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Company</h3>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Our Team
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        Press
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li className="text-muted-foreground">123 Travel Lane, Adventure City</li>
                                <li className="text-muted-foreground">contact@wanderlust.com</li>
                                <li className="text-muted-foreground">+1 (555) 123-4567</li>
                            </ul>
                            <div className="mt-4">
                                <Button variant="outline" className="w-full">
                                    Subscribe to Newsletter
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer