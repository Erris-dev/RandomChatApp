#
# Dockerfile
# Located in the root of your 'RandomChatApp' repository
#

# --- Stage 1: Builder ---
# This stage installs all dependencies (dev and production) and builds the client.
FROM node:20-alpine AS builder

# Set the working directory inside the container to /app
# This is where your entire project will reside during the build process
WORKDIR /app

# Copy the root package.json and package-lock.json first
# This allows Docker to cache this layer. If only code changes,
# these 'npm install' steps won't need to be re-run.
COPY package.json package-lock.json ./

# Copy the package.json and package-lock.json for your client and server sub-projects
# These are necessary for the `npm install --prefix` commands in your 'build' script
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package.lock.json ./server/ 

# Copy the rest of your application code
# This copies all files from your local 'RandomChatApp' directory (the build context)
# into '/app' inside the container. This includes your 'client' and 'server' folders.
COPY . .

# Run the 'build' script defined in your root package.json.
# This single command will:
# 1. npm install --prefix server (install server dependencies into /app/server/node_modules)
# 2. npm install --prefix client (install client dependencies into /app/client/node_modules)
# 3. npm run build --prefix client (build the client, typically into /app/client/dist)
RUN npm run build


# --- Stage 2: Production ---
# This stage creates the final, lean image for your server application.
FROM node:20-alpine AS production

# Set the working directory for the runtime environment
WORKDIR /app

# Copy only the essential files from the 'builder' stage for production runtime:

# 1. Copy the root package.json and package-lock.json.
#    This is crucial because your 'start' script (`npm run start --prefix server`)
#    is defined in this root package.json.
COPY --from=builder /app/package.json /app/package-lock.json ./

# 2. Copy the server's production dependencies (node_modules).
#    These were installed into /app/server/node_modules in the builder stage.
COPY --from=builder /app/server/node_modules ./server/node_modules

# 3. Copy the server's source code.
#    This gets your actual server application files.
#    (Excludes node_modules as they're copied separately above)
COPY --from=builder /app/server/ . /app/server/

# 4. Copy the built client assets.
#    Assuming 'npm run build --prefix client' outputs to /app/client/dist.
#    This is needed if your server serves these static client files.
COPY --from=builder /app/client/dist ./client/dist

# Expose the port your server application listens on.
# IMPORTANT: Change 3000 to the actual port your server binds to (e.g., 5000, 8080).
EXPOSE 3000

# Command to start the application.
# This executes the 'start' script from your root package.json,
# which in turn runs `npm run start --prefix server`.
CMD ["npm", "start"]