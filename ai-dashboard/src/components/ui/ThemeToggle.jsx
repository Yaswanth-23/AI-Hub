import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full hover:scale-110 transition"
    >
      {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
    </button>
  );
}