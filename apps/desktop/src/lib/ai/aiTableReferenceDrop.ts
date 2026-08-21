import { formatAiTableMention, type AiTableMention } from "@/lib/ai/aiTableMentions";
import type { QueryEditorTableReferencePayload } from "@/lib/editor/queryEditorTableDrop";

/** Selector marking the AI assistant panel root as a table-reference drop target. */
export const AI_ASSISTANT_TABLE_DROP_ROOT_SELECTOR = "[data-ai-assistant-root]";

/**
 * Maps a sidebar table-reference drag payload to an AI table mention chip.
 * Only plain table/view references become mentions; database and column
 * references are not representable as table mentions and return null.
 */
export function aiTableMentionFromTableReference(payload: QueryEditorTableReferencePayload | null | undefined): AiTableMention | null {
  if (!payload || payload.referenceType === "database" || payload.columnName) return null;
  const table = payload.tableName;
  if (!table) return null;
  const schema = payload.schema;
  return { raw: formatAiTableMention(schema, table), schema, table };
}
