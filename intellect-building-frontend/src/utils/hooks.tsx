import { useEffect, useState } from "react";

export const usePagination = <T,>(
  datas: Array<T>,
  nbrePerPage: number,
  total?: number
) => {
  const nbrePage = Math.ceil((total ? total : datas.length) / nbrePerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const goTo = async (page: number) => {
    if (page >= 1 && page <= nbrePage) {
      setCurrentPage(page);
    }
  };

  const results = datas.filter(
    (_, i) =>
      i >= (currentPage - 1) * nbrePerPage && i <= currentPage * nbrePerPage - 1
  );

  return { results, nbrePage, goTo, currentPage };
};

export const useScrolling = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  // Seuil de défilement en pixels
  const scrollThreshold = 200;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolling };
};

export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  return { loading, setLoading, error, setError };
};
