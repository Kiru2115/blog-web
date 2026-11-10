interface Props {
  name: string;
  year: number;
}

const SiteFooter = ({ name, year }: Props) => {
  return (
    <footer className="mx-auto w-full max-w-3xl px-4 pb-10 text-center text-sm text-gi-dark-gray">
      <p className="wrap-break-word">
        © {year} {name} · Built with React, Vite and Tailwind CSS
      </p>
    </footer>
  );
};

export default SiteFooter;
