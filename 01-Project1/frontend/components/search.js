import { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/search.module.css";

export default function Search() {
  const [term, setTerm] = useState("");
  const { push } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    push(`/events/search?term=${term}`);
    setTerm("");
  };
  const handleChange = ({ target: { value } }) => setTerm(value);

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
}
