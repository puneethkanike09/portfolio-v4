import Link from "next/link";
import { TbBrandWhatsapp, TbBrandGithubFilled, TbBrandWhatsappFilled, TbBrandLinkedinFilled, TbBrandInstagramFilled } from "react-icons/tb";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              Puneeth<span className="text-primary">Kanike</span>
            </Link>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="https://www.instagram.com/k_puneeth_gowda?igsh=MWJ1Z2hmb3I5Z2JuNg==" target="_blank" aria-label="Instagram">
              <TbBrandInstagramFilled className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://linkedin.com/in/puneeth-kanike/" target="_blank" aria-label="LinkedIn">
              <TbBrandLinkedinFilled className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=917975187240" target="_blank" aria-label="WhatsApp">
              <TbBrandWhatsappFilled className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://github.com/puneethkanike09" target="_blank" aria-label="GitHub">
              <TbBrandGithubFilled className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right">
            &copy; {currentYear} Puneeth K. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
