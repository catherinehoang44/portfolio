// Mapping from friendly URL names to internal project IDs
export const projectNameMap = {
  'adobe-certification': 'project-5',
  'openai-concept': 'project-10',
  'pokemon-recreated': 'project-14',
}

// Reverse mapping from project ID to friendly name
export const projectIdToName = {
  'project-5': 'adobe-certification',
  'project-10': 'openai-concept',
  'project-14': 'pokemon-recreated',
}

// Helper function to convert URL name to project ID
export const getProjectId = (urlName) => {
  return projectNameMap[urlName] || urlName // Fallback to original if not in map
}

// Helper function to convert project ID to URL name
export const getProjectUrlName = (projectId) => {
  return projectIdToName[projectId] || projectId // Fallback to original if not in map
}

