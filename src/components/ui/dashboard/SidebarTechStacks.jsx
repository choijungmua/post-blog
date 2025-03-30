import React from "react";
import { Table, TableBody, TableRow, TableCell } from "../../shadcn/table";
import { techStacksByCategory } from "../../../lib/data/techList";

const SidebarTechStacks = () => {
  return (
    <div className="p-4 pb-16 space-y-6">
      {Object.entries(techStacksByCategory).map(([category, techs]) => (
        <div key={category} className="mb-4">
          <h3 className="font-medium text-lg mb-2">{category}</h3>
          <Table>
            <TableBody>
              {techs.map((tech) => {
                const Icon = tech.icon;
                return (
                  <TableRow key={tech.id} className="hover:bg-slate-100/20">
                    <TableCell className="py-2">
                      <div className="flex items-center gap-3">
                        <Icon className="text-primary text-lg" />
                        <span className="text-sm">{tech.name}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default SidebarTechStacks;
