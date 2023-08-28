const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <a href="https://unitheme.net/" className="breadcrumbs__link">
        <bdi>Главная</bdi>
      </a>
      <span className="breadcrumbs__slash">/</span>
      <a href="https://unitheme.net/electronics/" className="breadcrumbs__link">
        <bdi>Электроника</bdi>
      </a>
      <span className="breadcrumbs__slash">/</span>
      <span className="breadcrumbs__current">
        <bdi>Телефоны</bdi>
      </span>
    </div>
  );
};

export { Breadcrumbs };
