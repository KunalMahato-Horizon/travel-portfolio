function Container({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {children}

      {/*
        PURPOSE:
        - Controls max width of content
        - Adds consistent horizontal padding
        - Keeps layout uniform across the site

        FUTURE IMPROVEMENTS:
        - Add size props (sm, md, lg)
        - Add vertical padding option
        - Add animation wrapper (fade-in on scroll)
      */}
    </div>
  );
}

export default Container;
