import {declare} from '@babel/helper-plugin-utils'

export default declare((_api, opts) => {
  const {requireDirective = false, identifiers} = opts

  const STRIP_DIRECTIVE = /@strip-block/

  let skipStrip = false

  function Handle(path) {
    const {node} = path

    for (const identifier of identifiers) {
      const {start, end} = identifier
      let stripStart = false
      if (node.leadingComments && node.leadingComments.length > 0) {
        for (const comment of node.leadingComments) {
          if (new RegExp(start).test(comment.value)) {
            stripStart = true
            comment.ignore = true
          }
        }
      }

      let stripEnd = false
      if (node.trailingComments && node.trailingComments.length > 0) {
        for (const comment of node.trailingComments) {
          if (new RegExp(end).test(comment.value)) {
            stripEnd = true
            comment.ignore = true
          }
        }
      }

      if (stripStart && stripEnd) {
        path.remove()
        return
      }
    }
  }

  return {
    name: 'transform-strip-block',

    visitor: {
      Program(
        path,
        {
          file: {
            ast: {comments},
          },
        }
      ) {
        skipStrip = false
        let directiveFound = false

        if (comments) {
          for (const comment of comments) {
            if (STRIP_DIRECTIVE.test(comment.value)) {
              directiveFound = true

              // remove directive
              comment.value = comment.value.replace(STRIP_DIRECTIVE, '')

              // remove the comment completely if it only consists of whitespace and/or stars
              if (!comment.value.replace(/\*/g, '').trim()) {
                comment.ignore = true
              }
            }
          }
        }

        if (!directiveFound && requireDirective) {
          skipStrip = true
        }
      },

      ObjectProperty(path) {
        if (skipStrip) return
        Handle(path)
      },

      FunctionDeclaration(path) {
        if (skipStrip) return
        Handle(path)
      },

      ExpressionStatement(path) {
        if (skipStrip) return
        Handle(path)
      },

      VariableDeclaration(path) {
        if (skipStrip) return
        Handle(path)
      },
    },
  }
})
