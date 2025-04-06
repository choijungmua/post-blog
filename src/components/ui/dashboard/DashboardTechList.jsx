import React from "react";
import {
  frontendTechs,
  backendTechs,
  devopsTechs,
  techStacksByCategory,
} from "../../utils/data/techList";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../shadcn/table";

const TechItem = ({ tech }) => {
  // icon이 문자열(이미지 경로)인 경우와 React 컴포넌트인 경우를 모두 처리
  const isIconComponent = typeof tech.icon !== "string";

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          {isIconComponent ? (
            React.createElement(tech.icon, {
              className: "text-primary text-lg",
              "aria-hidden": "true",
            })
          ) : (
            <img
              src={`/icons/${tech.icon}`}
              alt={tech.name}
              className="w-6 h-6"
            />
          )}
          <span>{tech.name}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

const TechCategory = ({ title, techs }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <Table>
        <TableBody>
          {techs.map((tech) => (
            <TechItem key={tech.id} tech={tech} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// 카테고리별 기술 스택 표시
const CategoryTechList = () => {
  return (
    <div className="space-y-6">
      {Object.entries(techStacksByCategory).map(([category, techs]) => (
        <TechCategory key={category} title={category} techs={techs} />
      ))}
    </div>
  );
};

const DashboardTechList = ({ useCategorized = false }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">기술 스택</h2>

      {useCategorized ? (
        <CategoryTechList />
      ) : (
        <>
          <TechCategory title="프론트엔드" techs={frontendTechs} />
          <TechCategory title="백엔드" techs={backendTechs} />
          <TechCategory title="DevOps" techs={devopsTechs} />
        </>
      )}
    </div>
  );
};

export default DashboardTechList;
