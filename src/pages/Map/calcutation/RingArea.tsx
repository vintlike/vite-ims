/**
 * 面积计算
 * @returns
 */
const RingArea = () => {
  const pol1 = [
    [113.89373839009866, 22.50234236284194],
    [113.89423621889811, 22.500927224403764],
    [113.89426831087472, 22.500823091763447],
    [113.89447594388136, 22.50021835253966],
    [113.89570186638527, 22.50056729478759],
    [113.8949647973533, 22.50271092512062],
    [113.89373839009866, 22.50234236284194]
  ];

  const pol2 = [
    [113.89379639459929, 22.502300670183782],
    [113.89456039134858, 22.50010067880426],
    [113.89574642531313, 22.500460579300036],
    [113.89511636454992, 22.502237594270458],
    [113.89508043293769, 22.50230061792825],
    [113.89495539057052, 22.502651627693282],
    [113.89379639459929, 22.502300670183782]
  ];

  /** 在index.html中引入jsts库 */
  const reader = new jsts.io.GeoJSONReader();
  const writer = new jsts.io.GeoJSONWriter();

  // 定义多边形坐标
  const poly1 = {
    type: 'Polygon',
    coordinates: [pol1]
  };

  const poly2 = {
    type: 'Polygon',
    coordinates: [pol2]
  };

  // 转换为 JSTS 几何对象
  const geometry1 = reader.read(poly1);
  const geometry2 = reader.read(poly2);

  // 计算交集
  const result = geometry1.intersection(geometry2);
  const intersectionGeoJSON = null;
  let intersectionArea = 0;

  if (!result.isEmpty()) {
    const intersectionGeoJSON = writer.write(result);
    intersectionArea = result.getArea();
    console.log('交集结果：', intersectionGeoJSON);
  }

  return (
    <div>
      <div>基于JSTS库，与Python中的shapely库计算结果一致</div>
      <div>多边形面积：{intersectionGeoJSON}</div>
      <div>多边形面积：{intersectionArea}</div>
      <div>多边形面积(米)：{intersectionArea * 9101160000.085981}</div>
    </div>
  );
};

export default RingArea;
