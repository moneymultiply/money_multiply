/* Server component — emits a JSON-LD <script> for structured data. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user-controlled HTML); we still
      // escape "<" to defend against any stray closing-tag sequence in data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
