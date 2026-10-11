To set up separate SSH keys for two GitHub accounts (work and personal) on Debian Linux, follow these steps.

1. **Generate the SSH Keys:** Terminal.
Open your terminal and generate dedicated SSH keys for each account using the Ed25519 algorithm.

```bash
# Generate Work SSH Key
ssh-keygen -t ed25519 -C "raulcontreraso@gmail.com" -f ~/.ssh/id_ed25519_rco

# Generate Personal SSH Key
ssh-keygen -t ed25519 -C "raconobe@gmail.com"       -f ~/.ssh/id_ed25519_raco

```

Press `Enter` to accept the defaults when prompted (you can optionally add a passphrase for added security).

**Verification:** Run `ls -la ~/.ssh` to ensure `id_ed25519_work`, `id_ed25519_work.pub`, `id_ed25519_personal`, and `id_ed25519_personal.pub` exist.

```Bash
ls -la ~/.ssh
```






2. **Configure the SSH Agent and Config File:** ~/.ssh/config.
Start the SSH agent and create an SSH configuration file to map host aliases to each key.

1. Ensure the SSH agent is running:

```bash
eval "$(ssh-agent -s)"

```

2. Add the private keys to the agent:

```bash
ssh-add ~/.ssh/id_ed25519_rco
ssh-add ~/.ssh/id_ed25519_raco
```

3. Open or create the SSH config file:

```bash
nano ~/.ssh/config

```

4. Paste the following configuration:

```text
# Work GitHub Account
Host github.com-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

# Personal GitHub Account
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

```

5. Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`), then adjust permissions:

```bash
chmod 600 ~/.ssh/config

```

**Verification:** Run `ssh-add -l` to verify both keys are loaded in the agent.


3. **Add Public Keys to GitHub:** GitHub Web Interface.
Copy the contents of each public key and add them to their respective GitHub accounts.

1. Display and copy your **work** public key:

```bash
cat ~/.ssh/id_ed25519_rco.pub

```

2. Log into your **Work GitHub Account** $\rightarrow$ Go to **Settings** $\rightarrow$ **SSH and GPG keys** $\rightarrow$ **New SSH key** $\rightarrow$ Paste the key and click **Add SSH key**.
3. Display and copy your **personal** public key:

```bash
cat ~/.ssh/id_ed25519_raco.pub

```

4. Log into your **Personal GitHub Account** $\rightarrow$ Go to **Settings** $\rightarrow$ **SSH and GPG keys** $\rightarrow$ **New SSH key** $\rightarrow$ Paste the key and click **Add SSH key**.

**Verification:** Test connection for both accounts:

```bash
ssh -T git@github.com-rco
ssh -T git@github.com-raco

```

You should see a message like: `Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.`


4. **Cloning and Configuring Git Repositories:** Per-Repository Setup.
When cloning repositories, modify the domain in the clone URL to use your configured host aliases (`github.com-work` or `github.com-personal`).

**For Work Repositories:**

```bash
git clone git@github.com-work:work-org/work-repo.git
cd work-repo
git config user.name "Work Name"
git config user.email "work_email@company.com"

```

**For Personal Repositories:**

```bash
git clone git@github.com-personal:personal-user/personal-repo.git
cd personal-repo
git config user.name "Personal Name"
git config user.email "personal_email@example.com"

```

**Verification:** Run `git config user.email` inside each repository folder to ensure the correct committer email is set.








---
L
---

To find out where the connection failed, let's test each component step by step. Run these diagnostic commands in your terminal and share the output:

### Step 1: Test SSH authentication with detailed debugging

Run the debug command for both accounts:

```bash
ssh -vT git@github.com-work

```

```bash
ssh -vT git@github.com-raco
```

### Step 2: Check active keys in the SSH agent

Verify whether your private keys are loaded:

```bash
ssh-add -l

```

### Step 3: Check SSH config permissions and content

Ensure the configuration file permissions and settings match:

```bash
ls -la ~/.ssh/
cat ~/.ssh/config

```

---

L
---




1. **Open the SSH Configuration File:** Terminal.
Open `~/.ssh/config` in your terminal:

```bash
nano ~/.ssh/config

```


2. **Replace the Configuration Content:** Editor.
Delete the existing text and paste the updated configuration matching `github.com-rco` and `github.com-raco`:

```text
# Work GitHub Account (rco)
Host github.com-rco
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_rco
    IdentitiesOnly yes

# Personal GitHub Account (raco)
Host github.com-raco
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_raco
    IdentitiesOnly yes

```

Save the file in `nano` by pressing `Ctrl + O`, hitting `Enter`, and exiting with `Ctrl + X`.


3. **Verify SSH Connections:** Terminal.
Test both connections using the new aliases:

```bash
ssh -T git@github.com-rco

```

```bash
ssh -T git@github.com-raco

```

**Verification:** Both commands should output `Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.`, and the status in your GitHub settings will update from "Never used".




----
L
---

That response is completely normal and expected for a first-time SSH connection to GitHub!

When you see `Host key verification failed.`, it is because the terminal asked `Are you sure you want to continue connecting (yes/no/[fingerprint])?` and you hit `Enter` (or typed something other than `yes`), which aborted the connection.

### How to complete the step

Run the command again and type **`yes`** when prompted:

```bash
ssh -T git@github.com-raco

```

1. Type **`yes`** and press **`Enter`**.
2. Debian will add GitHub to your list of known hosts (`~/.ssh/known_hosts`).

Do the same for the work alias:

```bash
ssh -T git@github.com-rco

```

**Verification:** You should see:
`Hi <your-username>! You've successfully authenticated, but GitHub does not provide shell access.`




---
L
---
To ensure each repository commits under the correct name and email, you can configure them per-repository or automate them globally by directory structure using Git's `includeIf`.

---

### Option 1: Set Name and Email Per Repository (Local Config)

Navigate to your local repository directory and run the `git config` commands without the `--global` flag.

1. Open your terminal and navigate into your repository:
```bash
cd ~/path/to/your/work-repo

```


2. Set the repository-specific identity:
```bash
git config user.name "Work Name"
git config user.email "work_email@company.com"

```


3. **Verification:** Check the identity applied to this specific repository:
```bash
git config user.email

```



Repeat this process for personal repositories using your personal email and name.

---

### Option 2: Automate Identity by Folder Path (Recommended)

If you keep your work and personal projects in separate directories (e.g., `~/projects/work/` and `~/projects/personal/`), Git can automatically switch your `user.name` and `user.email` based on where the repository resides.

#### 1. Create separate Git config files for Work and Personal

Create `~/.gitconfig-work`:

```ini
[user]
    name = Work Name
    email = work_email@company.com

```

Create `~/.gitconfig-personal`:

```ini
[user]
    name = Personal Name
    email = personal_email@example.com

```

#### 2. Update your main `~/.gitconfig`

Open your global config file:

```bash
nano ~/.gitconfig

```

Add conditional includes based on folder locations:

```ini
# Default / Global fallback
[user]
    name = Personal Name
    email = personal_email@example.com

# Automatically apply work config for repositories inside ~/projects/work/
[includeIf "gitdir:~/projects/work/"]
    path = ~/.gitconfig-work

# Automatically apply personal config for repositories inside ~/projects/personal/
[includeIf "gitdir:~/projects/personal/"]
    path = ~/.gitconfig-personal

```

**Verification:** Navigate into any repository inside `~/projects/work/` and run `git config user.email` to confirm it prints your work email automatically.

---
L
---
Here is a clear, step-by-step guide to setting up directory-based Git configurations.

1. **Create Your Project Folders:** Terminal.
First, organize your code by creating separate folders for work and personal projects in your home directory:

```bash
mkdir -p ~/projects/work
mkdir -p ~/projects/personal

```

* **Work projects** will go inside `~/projects/work/`
* **Personal projects** will go inside `~/projects/personal/`

**Verification:** Run `ls ~/projects` to verify that both `work` and `personal` directories exist.


2. **Create the Work Git Profile:** ~/.gitconfig-work.
Create a dedicated file to hold your work name and email:

```bash
nano ~/.gitconfig-work

```

Paste the following block (replace with your actual work details):

```ini
[user]
    name = Work Name
    email = work_email@company.com

```

Save and exit `nano` (`Ctrl + O`, `Enter`, `Ctrl + X`).


3. **Create the Personal Git Profile:** ~/.gitconfig-personal.
Create a dedicated file to hold your personal name and email:

```bash
nano ~/.gitconfig-personal

```

Paste the following block (replace with your actual personal details):

```ini
[user]
    name = Personal Name
    email = raconobe@gmail.com

```

Save and exit `nano` (`Ctrl + O`, `Enter`, `Ctrl + X`).


4. **Link Everything in Main Git Config:** ~/.gitconfig.
Now edit your primary Git configuration file to automatically load the profiles based on where a project is located:

```bash
nano ~/.gitconfig

```

Paste the following content:

```ini
# Default settings
[user]
    name = Personal Name
    email = raconobe@gmail.com

# Automatically apply work config for any repository inside ~/projects/work/
[includeIf "gitdir:~/projects/work/"]
    path = ~/.gitconfig-work

# Automatically apply personal config for any repository inside ~/projects/personal/
[includeIf "gitdir:~/projects/personal/"]
    path = ~/.gitconfig-personal

```

Save and exit `nano` (`Ctrl + O`, `Enter`, `Ctrl + X`).


5. **Test the Setup:** Verification.
Test that Git switches identities automatically based on the folder you are in.

1. Go to your work folder, initialize a test repo, and check the email:

```bash
cd ~/projects/work
mkdir test-repo && cd test-repo && git init
git config user.email

```

*Result:* It prints `work_email@company.com`.

2. Clean up the test repo:

```bash
cd ~/projects/work && rm -rf test-repo

```

3. Go to your personal folder, initialize a test repo, and check the email:

```bash
cd ~/projects/personal
mkdir test-repo && cd test-repo && git init
git config user.email

```

*Result:* It prints `raconobe@gmail.com`.

4. Clean up the test repo:

```bash
cd ~/projects/personal && rm -rf test-repo

```


