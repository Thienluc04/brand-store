import { Checkbox, CheckboxStar } from "components/checkbox";
import { ChooseOption } from "./ChooseOption";
import { Button } from "components/button";
import { useAppSelector } from "app/hooks";
import { selectCategoryList } from "features/category/categorySlice";
import { selectFeatureList } from "features/feature/featureSlice";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Common, ListFilter } from "models";
import { productActions, selectProductQuery } from "features/product/productSlice";
import { useDispatch } from "react-redux";

export interface SidebarProps {
  listFilter: ListFilter | undefined;
  setListFilter: Dispatch<SetStateAction<ListFilter | undefined>>;
}

const { v4 } = require("uuid");

export function Sidebar({ setListFilter, listFilter }: SidebarProps) {
  const listCategory = useAppSelector(selectCategoryList);
  const listFeatures = useAppSelector(selectFeatureList);
  const listRating = [
    {
      number: 5,
      image: "/images/fiveStars.png",
    },
    {
      number: 4,
      image: "/images/fourStars.png",
    },
    {
      number: 3,
      image: "/images/threeStars.png",
    },
    {
      number: 2,
      image: "/images/twoStars.png",
    },
  ];

  const [categoryFilter, setCategoryFilter] = useState<Array<Common>>([]);
  const [featuresFilter, setFeaturesFilter] = useState<Array<Common>>([]);
  const [starsFilter, setStarsFilter] = useState<Array<number>>([]);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const [isApplyPrice, setIsApplyPrice] = useState<boolean>(false);

  const handleChangeMinPrice = (value: number) => {
    setMinPrice(value);
  };
  const handleChangeMaxPrice = (value: number) => {
    setMaxPrice(value);
  };

  const handleRangePrice = () => {
    if (minPrice > 0 && maxPrice > 0 && minPrice <= maxPrice) {
      setIsApplyPrice(true);
      const listFilter: ListFilter = {
        category: categoryFilter,
        features: featuresFilter,
        stars: starsFilter,
        range: {
          min: minPrice,
          max: maxPrice,
        },
      };

      setListFilter(listFilter);
    }
  };

  useEffect(() => {
    let listFilter: ListFilter;
    if (isApplyPrice) {
      listFilter = {
        category: categoryFilter,
        features: featuresFilter,
        stars: starsFilter,
        range: {
          min: minPrice,
          max: maxPrice,
        },
      };
    } else {
      listFilter = {
        category: categoryFilter,
        features: featuresFilter,
        stars: starsFilter,
      };
    }

    setListFilter(listFilter);
  }, [
    categoryFilter,
    featuresFilter,
    isApplyPrice,
    maxPrice,
    minPrice,
    setListFilter,
    starsFilter,
  ]);

  const isChecked =
    listFilter?.category.length === 0 &&
    listFilter?.features.length === 0 &&
    listFilter?.stars.length === 0;

  return (
    <div className="w-[240px] xl:flex hidden flex-col gap-3">
      <ChooseOption title="Category">
        {listCategory.map((item, index) => (
          <Checkbox
            key={item.id}
            id={item.id}
            name={item.name}
            setChecked={setCategoryFilter}
            listChecked={categoryFilter}
            checked={isChecked}
          >
            {item.name}
          </Checkbox>
        ))}
      </ChooseOption>
      <ChooseOption title="Features">
        {listFeatures.map((item, index) => (
          <Checkbox
            key={item.id}
            id={item.id}
            name={item.name}
            setChecked={setFeaturesFilter}
            listChecked={featuresFilter}
            checked={isChecked}
          >
            {item.name}
          </Checkbox>
        ))}
      </ChooseOption>
      <ChooseOption title="Price range">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-dark">Min</h2>
            <div className="max-w-[110px]">
              <input
                type="number"
                className="w-full bg-white rounded-md border border-gray3 p-2 outline-none"
                placeholder="0"
                onChange={(e) => handleChangeMinPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-dark">Max</h2>
            <div className="max-w-[110px]">
              <input
                type="number"
                className="w-full bg-white rounded-md border border-gray3 p-2 outline-none"
                placeholder="999999"
                onChange={(e) => handleChangeMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <Button
          kind="secondary"
          className="max-w-[75px] mx-auto border border-gray3 text-primary font-medium"
          onClick={handleRangePrice}
        >
          Apply
        </Button>
      </ChooseOption>
      <ChooseOption title="Ratings">
        {listRating.map((item, index) => (
          <CheckboxStar
            key={v4()}
            id={item.number}
            setChecked={setStarsFilter}
            listChecked={starsFilter}
            checked={isChecked}
          >
            <img src={item.image} alt="" />
          </CheckboxStar>
        ))}
      </ChooseOption>
    </div>
  );
}
