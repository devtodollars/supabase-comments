# Supabase Comments
A React library for integrating Supabase powered comments into your applications. Inspired by [supabase-comments-extension](https://github.com/malerba118/supabase-comments-extension).
- Demo: https://supabase-comments.netlify.app

https://github.com/devtodollars/supabase-comments/assets/20890995/be175c42-fcad-4e2d-866a-3ebff4a3297b

## Features
- Configurable and beautiful shadecn/ui
- Built in light and dark modes
- Nested Comments
- Uses Supabase Authentication

## Getting Started
1. Install this package and it's peer dependencies
```
npm install --save @supabase/supabase-js @supabase/auth-ui-shared @supabase/auth-ui-react @tanstack/react-query supabase-comments
```
2. Go to [Supabase SQL editor](https://supabase.com/dashboard/project/_/sql/)
3. Copy SQL commands from [01_init.sql](https://github.com/devtodollars/supabase-comments/blob/main/supabase/migrations/01_init.sql) and run them in the SQL editor. This will create tables needed to store the comments
4. Add imports and initialize supabase client
```
import { createClient } from "@supabase/supabase-js";
import { CommentsSection } from "supabase-comments";
import "supabase-comments/style.css";

const SUPABASE_URL = "INSERT_SUPABASE_URL";
const SUPABASE_ANON_KEY = "INSERT_SUPABASE_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```
4. Add the `CommentsSection` into your react app.
```
<CommentsSection
  topic="supabase-comments-demo-topic"
  supabaseClient={supabase}
/>
```

## Adjusting the Theme
1. Go to the [shadecn theme generator](https://ui.shadcn.com/themes), generate a theme and copy the code.
Note: only copy the `root:` and `.dark` part. For example:
```shadecn-theme.css
:root {
  --background: 0 0% 100%;
  /* other attributes */
}

.dark {
  --background: 0 0% 3.9%;
  /* other attributes */
}
```
2. Paste the css into a file called `shadecn-theme.css`
3. Add the import *underneath* the  `import supabase-comments/style.css`.
```
import "supabase-comments/style.css"
import "./shadecn-theme.css"
```

## Upcoming Features
- [ ] Add `onAuthenticate` function to give option for custom Authentication
- [ ] Edit / delete comments
- [ ] Add comment reactions
- [ ] Markdown editing options (e.g. bold, italic, etc.)

## API
```
export interface CommentsSectionProps {
  supabaseClient: SupabaseClient; // supabaase client
  topic: string; // the topic or thread
  authComponent?: ReactNode; // the auth component within the dialog
  mode?: "light" | "dark"; // light or dark mode
}
```

