# GlitchCMD

A CLI for glitch.com

## Usage

```txt
glitch <cmd> [args]

Commands:
  glitch get <selector>                   Gets a user or project.
  glitch init                             Initilizes a project.
  glitch login [code]                     Creates a user to be used later.
  glitch logout                           Removes the login token from the
                                          keychain.
  glitch me [action] [actionb] [project]  Does an action on the user.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

Examples:
  glitch init                       Creates a new project.
  glitch login                      Login with login code.
  glitch logout                     Remove login code.
  glitch me projects                Lists all projects
  glitch me projects edit <name>    Edits the given project.
  glitch me projects delete <name>  Deletes the given project.
  glitch get @<name | id>           Gets the given user by name or id.
  glitch get #<domain | id>         Gets the given project by name or id.
```
