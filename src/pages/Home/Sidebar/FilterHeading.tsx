type Props = {
  children: React.ReactNode;
};

export default function FilterHeading({ children }: Props) {
  return <h3 className="font-medium mb-4 text-lg">{children}</h3>;
}
