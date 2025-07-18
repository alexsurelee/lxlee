import { describe, it, expect } from "vitest";
import { extractPlainText } from "./posts";

describe("extractPlainText", () => {
  it("should handle basic markdown text", () => {
    const input = "This is a simple paragraph with some text.";
    const result = extractPlainText(input);
    expect(result).toBe("This is a simple paragraph with some text");
  });

  it("should remove code blocks", () => {
    const input = `
Here is some text.

\`\`\`typescript
const hello = "world";
console.log(hello);
\`\`\`

More text here.
    `;
    const result = extractPlainText(input);
    expect(result).toBe("Here is some text More text here");
  });

  it("should remove inline code", () => {
    const input = "Use the `useState` hook to manage state in React.";
    const result = extractPlainText(input);
    expect(result).toBe("Use the hook to manage state in React");
  });

  it("should remove JSX expressions", () => {
    const input = "The user name is {userName} and the count is {count + 1}.";
    const result = extractPlainText(input);
    expect(result).toBe("The user name is and the count is");
  });

  it("should extract content from paired JSX tags", () => {
    const input = "<CalloutBox>This is important content</CalloutBox>";
    const result = extractPlainText(input);
    expect(result).toBe("This is important content");
  });

  it("should handle nested JSX tags", () => {
    const input = "<div><p>Nested content here</p></div>";
    const result = extractPlainText(input);
    expect(result).toBe("Nested content here");
  });

  it("should remove self-closing tags", () => {
    const input = "Before <ImageGallery images={photos} /> after.";
    const result = extractPlainText(input);
    expect(result).toBe("Before after");
  });

  it("should remove markdown headers", () => {
    const input = `
# Main Title
## Subtitle
### Subsection
Some content here.
    `;
    const result = extractPlainText(input);
    expect(result).toBe("Main Title Subtitle Subsection Some content here");
  });

  it("should remove bold formatting", () => {
    const input = "This is **bold text** in a sentence.";
    const result = extractPlainText(input);
    expect(result).toBe("This is bold text in a sentence");
  });

  it("should remove italic formatting", () => {
    const input = "This is *italic text* in a sentence.";
    const result = extractPlainText(input);
    expect(result).toBe("This is italic text in a sentence");
  });

  it("should remove markdown links", () => {
    const input = "Visit [Google](https://google.com) for search.";
    const result = extractPlainText(input);
    expect(result).toBe("Visit Google for search");
  });

  it("should handle complex MDX content", () => {
    const input = `
# Introduction

This is a **complex** MDX document with *various* elements.

\`\`\`javascript
const example = "code block";
\`\`\`

<CalloutBox type="warning">
  This is a **warning** with {dynamicContent} inside.
</CalloutBox>

Regular paragraph with \`inline code\` and [a link](https://example.com).

<ComponentWithProps data={complexObject} />

## Conclusion

More text here.
    `;
    const result = extractPlainText(input);
    expect(result).toBe(
      "Introduction This is a complex MDX document with various elements This is a warning with inside Regular paragraph with and a link Conclusion More text here"
    );
  });

  it("should normalize whitespace", () => {
    const input = `
      Lots    of   
      
      whitespace     here.
    `;
    const result = extractPlainText(input);
    expect(result).toBe("Lots of whitespace here");
  });

  it("should handle empty content", () => {
    const input = "";
    const result = extractPlainText(input);
    expect(result).toBe("");
  });

  it("should handle content with only code blocks", () => {
    const input = `
\`\`\`typescript
const hello = "world";
\`\`\`

\`\`\`javascript
console.log("test");
\`\`\`
    `;
    const result = extractPlainText(input);
    expect(result).toBe("");
  });

  it("should handle mixed HTML and JSX components", () => {
    const input = `
<div className="container">
  <h1>Title</h1>
  <CustomComponent prop={value}>
    Content inside custom component
  </CustomComponent>
  <p>Regular HTML paragraph</p>
</div>
    `;
    const result = extractPlainText(input);
    expect(result).toBe(
      "Title Content inside custom component Regular HTML paragraph"
    );
  });

  it("should handle malformed or unclosed tags gracefully", () => {
    const input = "Text before <unclosed-tag and text after.";
    const result = extractPlainText(input);
    expect(result).toBe("Text before and text after");
  });

  it("should preserve content order", () => {
    const input = `
First paragraph.

<Component>Middle content</Component>

Last paragraph.
    `;
    const result = extractPlainText(input);
    expect(result).toBe("First paragraph Middle content Last paragraph");
  });
});
