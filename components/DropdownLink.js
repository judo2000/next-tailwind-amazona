import Link from 'next/link';

const DropdownLink = (props) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <span {...rest}>{children}</span>
    </Link>
  );
};

export default DropdownLink;
