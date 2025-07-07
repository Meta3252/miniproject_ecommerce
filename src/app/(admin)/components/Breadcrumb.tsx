"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();

  // ตัด /admin ออก ถ้าอยากเปลี่ยนก็แก้ตรงนี้
  let paths = pathname
    .replace(/^\/admin/, "")
    .split("/")
    .filter(Boolean);

  if (paths.length === 0) {
    paths = ["overview"];
  }
  const formatSegment = (segment: string) =>
    segment.charAt(0).toUpperCase() + segment.slice(1);

  // สร้างลิงก์ path ทีละขั้น เช่น /admin/overview, /admin/overview/detail
  const buildHref = (index: number) => {
    return "/admin" + paths.slice(0, index + 1).map((p) => "/" + p).join("");
  };

  return (
    <nav className="mb-4 text-sm text-gray-500 select-none" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li>
          <Link href="/admin" className="text-blue-600 font-semibold hover:underline">
            Dashboards
          </Link>
          {paths.length > 0 && <span className="mx-2">/</span>}
        </li>

        {paths.map((segment, i) => (
          <li key={i} className="flex items-center">
            <Link
              href={buildHref(i)}
              className={`hover:underline ${i === paths.length - 1 ? "font-semibold text-blue-700" : ""}`}
              aria-current={i === paths.length - 1 ? "page" : undefined}
            >
              {formatSegment(segment)}
            </Link>
            {i !== paths.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
