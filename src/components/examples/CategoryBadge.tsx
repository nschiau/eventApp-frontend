import CategoryBadge from '../CategoryBadge';

export default function CategoryBadgeExample() {
  return (
    <div className="p-8 flex flex-wrap gap-4">
      <CategoryBadge category="theatre" />
      <CategoryBadge category="cinema" />
      <CategoryBadge category="concerts" />
      <CategoryBadge category="parties" />
    </div>
  );
}
