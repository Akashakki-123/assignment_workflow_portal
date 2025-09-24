export function assignmentFormatter(reqData, teacherId) {
  const { title, description, dueDate } = reqData.body;
  return { title, description, dueDate, createdBy: teacherId };
}

export function updateAssignmentFormatter(reqData) {
  const { title, description, dueDate, status } = reqData.body;
  const out = {};
  if (title) out.title = title;
  if (description) out.description = description;
  if (dueDate) out.dueDate = dueDate;
  if (status) out.status = status;
  return out;
}
