const Search = () => {
  return (
    <div className="search">
      <form action="" name="search_form" method="get" className="search__form">
        <input type="hidden" name="match" value="all" />
        <input type="hidden" name="subcats" value="Y" />
        <input type="hidden" name="pcode_from_q" value="Y" />
        <input type="hidden" name="pshort" value="Y" />
        <input type="hidden" name="pfull" value="Y" />
        <input type="hidden" name="pname" value="Y" />
        <input type="hidden" name="pkeywords" value="Y" />
        <input type="hidden" name="search_performed" value="Y" />

        <input
          type="text"
          name="q"
          defaultValue=""
          title="Искать товары"
          className="search__input"
          data-cur-placeholder-string="Ищите по названию"
          placeholder="Поиск"
        />
        <button title="Найти" className="search__magnifier" type="submit"></button>
      </form>
    </div>
  );
};

export { Search };
