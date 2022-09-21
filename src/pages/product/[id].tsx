import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();

  return <h2>{JSON.stringify(query)}</h2>;
}
