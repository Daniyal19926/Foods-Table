import { range } from "../../services/utils";

interface Props {
  totalCount: number;
  pageSize: number;
  onPageSelect(page: number): void;
  selectedPage: number;
}

function Pagination({
  totalCount,
  pageSize,
  selectedPage,
  onPageSelect,
}: Props) {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const pages = range(1, pagesCount);

  if (pagesCount === 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onPageSelect(page)}
            className={`page-item ${page === selectedPage ? `active` : ``} `}
          >
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
