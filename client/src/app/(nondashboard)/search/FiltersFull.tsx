"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cleanParams, cn } from '@/lib/utils';
import { initialState, setFilters } from '@/state';
import { useAppSelector } from '@/state/redux';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { RoomTypeIcons } from '@/lib/constants';

const FiltersFull = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const filters = useAppSelector((state) => state.global.filters);
    const [localFilters, setLocalFilters] = useState(initialState.filters);
    const isFiltersFullOpen = useAppSelector(
        (state) => state.global.isFiltersFullOpen
    );

    const updateURL = debounce((newFilters: any) => {
        const cleanFilters = cleanParams(newFilters);
        const updatedSearchParams = new URLSearchParams();

        Object.entries(cleanFilters).forEach(([key, value]) => {
            updatedSearchParams.set(
                key,
                Array.isArray(value) ? value.join(",") : value.toString()
            );
        });

        router.push(`${pathname}?${updatedSearchParams.toString()}`);
    }, 400);


    const handleSubmit = () => {
        dispatch(setFilters(localFilters));
        updateURL(localFilters);
    }

    const handleReset = () => {
        setLocalFilters(initialState.filters);
        dispatch(setFilters(initialState.filters));
        updateURL(initialState.filters);
    }

    if (!isFiltersFullOpen) return null;

    return <div
        className="bg-white rounded-lg px-4 h-full overflow-auto pb-10">
        <div className=" flex flex-col space-y-6 ">
        {/*Sreach Location */}
            <div>
                <h4 className="font-bold mb-2">Location</h4>
                <div className="flex items-center">
                    <Input
                        placeholder="Enter location"
                        value={filters.location}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                location: e.target.value,
                            }))
                        }
                        className="rounded-l-xl rounded-r-none border-r-0"
                    />
                    <Button
                        // onClick={handleLocationSearch}
                        className="rounded-r-xl rounded-l-none border-l-none border-black shadow-none border hover:bg-primary-700 hover:text-primary-50"
                    >
                        <Search className="w-4 h-4" />
                    </Button>
                </div>
            </div>

        {/* Property Type */}
        <div>
          <h4 className="font-bold mb-2">Property Type</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(RoomTypeIcons).map(([type, Icon]) => (
              <div
                key={type}
                className={cn(
                  "flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer",
                  localFilters.roomType === type
                    ? "border-black"
                    : "border-gray-200"
                )}
                onClick={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    propertyType: type as PropertyTypeEnum,
                  }))
                }
              >
                <Icon className="w-6 h-6 mb-2" />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>



        </div>
    </div>

}

export default FiltersFull