"use client";

import { setFilters, toggleFiltersFullOpen } from '@/state';
import { useAppSelector } from '@/state/redux';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { cleanParams, cn, formatPriceValue } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyTypeIcons } from "@/lib/constants"
const FiltersBar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const filters = useAppSelector((state) => state.global.filters);
    const isFiltersFullOpen = useAppSelector(
        (state) => state.global.isFiltersFullOpen);

    const viewMode = useAppSelector((state) => state.global.viewMode);
    const [searchInput, setSearchInput] = useState(filters.location);

    const updateURL = debounce((newFilters: any) => {
        const cleanFilters = cleanParams(newFilters);
        const updatedSearchParams = new URLSearchParams();

        Object.entries(cleanFilters).forEach(([key, value]) => {
            updatedSearchParams.set(
                key,
                Array.isArray(value) ? value.join(',') : value.toString()
            );
        });

        router.push(`${pathname}?${updatedSearchParams.toString()}`);
    }, 500);

    const handleFilterChange = (
        key: string,
        value: any,
        isMin: boolean | null
    ) => {
        let newValue = value;

        if (key === 'priceRange' || key === 'squareFeet') {
            const currentArrayRange = [...filters[key]];
            if (isMin !== null) {
                const index = isMin ? 0 : 1;
                currentArrayRange[index] = value === 'any' ? null : Number(value);
            }
            newValue = currentArrayRange;
        } else if (key === 'coordinates') {
            newValue = value === 'any' ? [0, 0] : value.map(Number);
        } else {
            newValue = value === 'any' ? 'any' : value;
        }

        const newFilters = { ...filters, [key]: newValue };
        dispatch(setFilters(newFilters));
        updateURL(newFilters);
    };

    return <div className="flex justyfy-between items-center w-full py-5">
        <div className="flex justify-between items-center gap-4 p-2">
            <Button
                variant="outline"
                className={cn(
                    "gap-2 rounded-xl border-primary-400 hover:bg-primary-500 hover:text-primary-100",
                    isFiltersFullOpen && "bg-primary-700 text-primary-100"
                )}
                onClick={() => dispatch(toggleFiltersFullOpen())}
            >
                <Filter className="w-4 h-4" />
                <span> Tất cả bộ lọc </span>
            </Button>

            <div className="flex items-center">
                <Input
                    placeholder="Tìm kiếm địa điểm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-40 rounded-l-xl rounded-r-none border-primary-400 border-r-0"
                />
                <Button
                    className={`rounder-r-xl rounded-l-none border-l-none border-primary-400 shadow-none 
                    border hover:bg-primary-700 hover:text-primary-50`}
                >
                    <Search className="w-4 h-4" />
                </Button>
            </div>
            {/* Phạm vi giá tiền */}
            <div className="flex gap-1">
                {/* Chọn giá tối thiểu */}
                <Select
                    value={filters.priceRange[0]?.toString() || "any"}
                    onValueChange={(value) =>
                        handleFilterChange("priceRange", value, true)
                    }
                >
                    <SelectTrigger className="w-22 rounded-xl border-primary-400">
                        <SelectValue>
                            {filters.priceRange[0]
                                ? formatPriceValue(filters.priceRange[0], true)
                                : "Chọn giá tối thiểu"}
                        </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-white">
                        <SelectItem value="any">Chọn giá tối thiểu</SelectItem>
                        {[500000, 1000000, 2000000, 3000000, 4000000, 5000000].map((price) => (
                            <SelectItem key={price} value={price.toString()}>
                                {price.toLocaleString("vi-VN")} ₫+
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* Chọn giá tối đa */}

                <Select
                    value={filters.priceRange[0]?.toString() || "any"}
                    onValueChange={(value) =>
                        handleFilterChange("priceRange", value, true)
                    }
                >
                    <SelectTrigger className="w-22 rounded-xl border-primary-400">
                        <SelectValue>
                            {filters.priceRange[0]
                                ? formatPriceValue(filters.priceRange[0], true)
                                : "Chọn giá tối đa"}
                        </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-white">
                        <SelectItem value="any">Chọn giá tối đa</SelectItem>
                        {[500000, 1000000, 2000000, 3000000, 4000000, 5000000].map((price) => (
                            <SelectItem key={price} value={price.toString()}>
                                {price.toLocaleString("vi-VN")} ₫+
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>  
        </div>
    </div>
};

export default FiltersBar;