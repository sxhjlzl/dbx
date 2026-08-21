import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const aiAssistantSource = readFileSync(new URL("../AiAssistant.vue", import.meta.url), "utf8");
const treeItemSource = readFileSync(new URL("../../sidebar/TreeItem.vue", import.meta.url), "utf8");

describe("AI assistant table reference drop", () => {
  it("marks the assistant root as a table-reference drop target", () => {
    expect(aiAssistantSource).toContain("data-ai-assistant-root");
  });

  it("listens for table-reference drop events while mounted", () => {
    expect(aiAssistantSource).toContain("window.addEventListener(DBX_TABLE_REFERENCE_DROP_EVENT, onTableReferenceDropEvent);");
    expect(aiAssistantSource).toContain("window.removeEventListener(DBX_TABLE_REFERENCE_DROP_EVENT, onTableReferenceDropEvent);");
  });

  it("turns dropped table references into table mention chips", () => {
    expect(aiAssistantSource).toContain("const mention = aiTableMentionFromTableReference(detail.payload);");
    expect(aiAssistantSource).toContain("!assistantRootRef.value?.contains(target)");
    expect(aiAssistantSource).toContain('addSelectedMention({ kind: "table", schema: mention.schema, name: mention.table, tableType: "table" });');
    expect(aiAssistantSource).toContain("clearActiveTableReferencePayload(detail.payload);");
  });

  it("dispatches sidebar drags released over the AI assistant", () => {
    expect(treeItemSource).toContain("AI_ASSISTANT_TABLE_DROP_ROOT_SELECTOR");
    expect(treeItemSource).toContain("target.closest(`[data-query-editor-root], ${AI_ASSISTANT_TABLE_DROP_ROOT_SELECTOR}`)");
  });
});
