import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
const config = defineConfig(
  {
  
  plugins: [react()],
   
    resolve: {
     alias: {
      'components':path.resolve(__dirname,'./src/components'),
      'pages':path.resolve(__dirname,'./src/pages'),
      'hooks':path.resolve(__dirname,'./src/hooks'),
      'context':path.resolve(__dirname,'./src/context')
     },
    }
  
}
)
export default config