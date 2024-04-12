import { colorsList } from "../constants";

export const getRandomColor = (currentColors: string[]): string => {
    const colorsToConsider = colorsList.slice(3); // Exclude the first three colors
    const randomIndex = Math.floor(Math.random() * colorsToConsider.length);
    const color = colorsToConsider[randomIndex];

    const alreadyExist = currentColors.find(colorItem => colorItem === color);

    if (alreadyExist) {
        // Recursively call itself until a new color is generated
        return getRandomColor(currentColors);
    }

    return color
}

export const areAllStringsUnique = (arr: string[]): boolean => {
    const lowerCaseArr = arr.map(item => item.toLowerCase());
    const set = new Set(lowerCaseArr);
    return set.size === arr.length;
}
