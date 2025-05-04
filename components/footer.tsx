import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TbBrandWhatsapp, TbBrandGithubFilled, TbBrandLinkedinFilled, TbBrandInstagramFilled } from 'react-icons/tb';
import { IconType } from 'react-icons';

// Define interface for social link
interface SocialLink {
  platform: string;
  url: string;
}

// Define interface for footer data
interface FooterData {
  socialLinks: SocialLink[];
  copyrightText: string;
}

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData>({ socialLinks: [], copyrightText: '' });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/footer');
        if (response.ok) {
          const data = await response.json();
          setFooterData(data);
        }
      } catch (error) {
        console.error('Failed to fetch footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  // Type the keys of iconMap explicitly
  const iconMap: { [key: string]: IconType } = {
    instagram: TbBrandInstagramFilled,
    linkedin: TbBrandLinkedinFilled,
    whatsapp: TbBrandWhatsapp,
    github: TbBrandGithubFilled,
  };

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
            {footerData.socialLinks.map((link, index) => {
              const Icon = iconMap[link.platform.toLowerCase()];
              return (
                <Link key={index} href={link.url} target="_blank" aria-label={link.platform}>
                  <Icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right">
            © {footerData.copyrightText || 'Puneeth K.'} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}