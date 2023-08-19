const SocialLinks = () => {
  const socialLinks = [
    { icon: 'facebook', link: 'https://www.facebook.com/' },
    { icon: 'gplus', link: 'https://plus.google.com' },
    { icon: 'discord', link: 'https://discord.com/' },
    { icon: 'instagram', link: 'https://www.instagram.com/' },
    { icon: 'youtube', link: 'https://www.youtube.com/' },
  ];

  return (
    <div className="social-links">
      <div className="social-links__body">
        {socialLinks.map((link, index) => (
          <div key={index} className="social-links__item">
            <a target="_blank" href={link.link}>
              <i className={`icon-${link.icon}`} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export { SocialLinks };
