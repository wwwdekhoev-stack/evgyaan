// Article tables.
//
// 7 of the 18 articles that carry a table - the monthly registration
// reports among them - ran off the side of a 390px phone, which is most of
// the audience. The table keeps its `prose` styling (the wrapper is a
// plain div, so the descendant selectors still match); it just gets a
// scroll container and a floor on its own width, so narrow screens scroll
// it sideways instead of crushing six numeric columns into nothing.
const MdxTable = (props) => (
  <div
    className="my-6 w-full overflow-x-auto overscroll-x-contain"
    // Keyboard users need to be able to reach a scrollable region.
    tabIndex={0}
    role="region"
    aria-label="Table, scroll horizontally to see all columns"
  >
    <table className="!my-0 w-full min-w-[640px]" {...props} />
  </div>
);

export default MdxTable;
