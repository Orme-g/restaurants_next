export default function prepareCousineList(cousineList: string[]) {
    const list = cousineList.join(", ");
    return list.length > 40 ? list.slice(0, 40) + "..." : list;
}
