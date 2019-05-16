import fetch from 'cross-fetch'

export const issueUrlRegexp = new RegExp('^(https?://[^/]+)/([^/]+)/([^/]+)/issues/([0-9]+)$')

export const getIssueInfo = url => {
  const match = url.match(issueUrlRegexp)
  if (match == null) {
    return null
  }

  const [, origin, namespace, project, id] = match

  return {
    origin,
    projectId: `${namespace}%2F${project}`,
    id
  }
}

export class ValidationError extends Error {
  constructor (message, info) {
    // Calling parent constructor of base Error class.
    super(message)

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.info = info || 500
  }
}

export const getIssueTitle = async ({ issueUrl, token }) => {
  const issueInfo = getIssueInfo(issueUrl)
  if (issueInfo == null) {
    throw new ValidationError('Invalid issue url', {
      issueUrl: 'Invalid issue url'
    })
  }

  const { origin, projectId, id } = issueInfo

  const response = await fetch(`${origin}/api/v4/projects/${projectId}/issues/${id}`, {
    headers: {
      'PRIVATE-TOKEN': token
    }
  })

  console.log(response)
  if (response.status === 404) {
    throw new ValidationError('Cannot find an issue', {
      issueUrl: 'Cannot find an issue'
    })
  } else if (response.status === 401) {
    throw ValidationError('Invalid token', {
      token: 'Invalid token'
    })
  } else if (!response.ok) {
    throw new ValidationError('Some internal error', {
      FORM_ERROR: 'Some internal error'
    })
  }

  const { title } = await response.json()

  return title
}
