"use client";

import { useState, useEffect } from "react";
import { GRADES } from "@/types";

export function useGrades() {
  const [activeGrades, setActiveGrades] = useState(GRADES);

  useEffect(() => {
    try {
      const data = localStorage.getItem('khodetoan_grades');
      if (data) {
        const gradesConfig = JSON.parse(data);
        const active = gradesConfig
          .filter((g: any) => g.is_active)
          .map((g: any) => ({ value: g.grade, label: g.name }));
        if (active.length > 0) {
          setActiveGrades(active);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return activeGrades;
}
