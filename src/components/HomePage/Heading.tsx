interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <div className="mt-2 font-light text-neutral-500">{subtitle}</div>}
    </div>
  );
};

export default Heading;
