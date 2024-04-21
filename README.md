# Supabase Comments
A React library for integrating Supabase powered comments into your applications. Inspired by [supabase-comments-extension](https://github.com/malerba118/supabase-comments-extension).

## Features
- Configurable and beautiful ShadeCN UI
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
import { ThemeMinimal } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { CommentsSection } from "supabase-comments";
import "supabase-comments/style.css";

const SUPABASE_URL = "INSERT_SUPABASE_URL";
const SUPABASE_ANON_KEY = "INSERT_SUPABASE_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```
4. Add the `CommentsSection` into your react app.
```
<CommentsSection
  topic="Single Topic"
  supabaseClient={supabase}
  authComponent={
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }} />
  }
/>
```

## Adjusting the Theme
1. Go to the [shadecn theme generator](https://zippystarter.com/tools/shadcn-ui-theme-generator), generate a theme and copy the code.
2. Paste the css into a file called `shadecn-theme.css`
3. Add the import *underneath* the  `import supabase-comments/style.css`.
```
import supabase-comments/style.css
import "./shadecn-theme.css"
```


## Upcoming Features
- Add `onAuthenticate` function to give option for custom Authentication
- Edit / delete comments
- Add comment reactions
- Markdown editing options (e.g. bold, italic, etc.)


## API

