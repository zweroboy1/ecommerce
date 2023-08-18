const SocialLinks = () => {
  const socialLinks = [
    { icon: 'facebook', link: '' },
    { icon: 'gplus', link: '' },
    { icon: 'discord', link: '' },
    { icon: 'instagram', link: '' },
    { icon: 'youtube', link: '' },
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
