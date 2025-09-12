"use client";

import { useState } from "react";

export default function StoreFilter({ categories }: { categories: string[] }) {
  const [selected, setSelected] = useState("");

  return (
    <>
    {/* Sidebar Filters */}
          <div className="md:w-1/4">
            <div className="bg-[#0f172a] rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-heading font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                <button className="category-btn w-full text-left py-2 px-4 rounded-lg active">All Games</button>
                <button className="category-btn w-full text-left py-2 px-4 rounded-lg">Action</button>
                <button className="category-btn w-full text-left py-2 px-4 rounded-lg">Adventure</button>
                <button className="category-btn w-full text-left py-2 px-4 rounded-lg">RPG</button>
                <button className="category-btn w-full text-left py-2 px-4 rounded-lg">FPS</button>
                <button className="category-btn w-full text-left py-2 px-4 rounded-lg">Sports</button>
                <button className="category-btn w-full text-left py-2 px-4 rounded-lg">Strategy</button>
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-heading font-bold mb-4">Price Range</h3>
              <div className="mb-4">
                <input type="range" min="0" max="100"  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="flex justify-between text-sm">
                <span>$0</span>
                <span>$50</span>
                <span>$100</span>
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-2xl p-6">
              <h3 className="text-xl font-heading font-bold mb-4">Platform</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-[#6366f1] rounded" />
                  <span className="ml-2">PC</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-[#6366f1] rounded" />
                  <span className="ml-2">PlayStation</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-[#6366f1] rounded" />
                  <span className="ml-2">Xbox</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-[#6366f1] rounded" />
                  <span className="ml-2">Nintendo Switch</span>
                </label>
              </div>
            </div>
          </div>
    </>
  );
}
