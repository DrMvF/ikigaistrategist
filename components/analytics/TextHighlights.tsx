// 3. components/analytics/TextHighlights.tsx
export default function TextHighlights({ texts }: { texts: string[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Highlighted Reflections</h3>
      <ul className="list-disc pl-5 space-y-1 text-base leading-relaxed">
        {texts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}
