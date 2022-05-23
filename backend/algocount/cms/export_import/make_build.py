import datetime
import json
import os
import shutil
import subprocess
import tempfile

from django.conf import settings

from cms.export_import.utils import get_paths_to_copy
from cms.models import Project
from cms.serializers.project import FullProjectSerializer


def make_build(*, project: Project, base_path: str = ""):
    files_to_copy_paths = get_paths_to_copy(project=project)
    with tempfile.TemporaryDirectory() as tmp_dirname:
        tmp_dirname = tmp_dirname + "/exit"
        shutil.copytree(settings.PROJECT_FRONTEND_EXPORT, tmp_dirname, symlinks=True)
        dir_export_site = os.path.join(tmp_dirname, "apps", "export-site")
        downloads_path = os.path.join(dir_export_site, "public", "media")
        if not os.path.isdir(downloads_path):
            os.mkdir(downloads_path)
        for path in files_to_copy_paths:
            shutil.copy(path, downloads_path)
        file = os.path.join(dir_export_site, "data.json")
        with open(file, 'w') as f:
            json.dump(FullProjectSerializer(project).data, f)
        with open(os.path.join(dir_export_site, ".env.local"), "w") as f:
            f.write(f"NX_BASE_PATH={base_path} \n")
            f.write(f"NX_FILE_PATH={file} \n")
        subprocess.check_call('npm ci && npx nx run export-site:export ', shell=True, cwd=tmp_dirname, close_fds=True)

        zip_name = os.path.join(tmp_dirname, "site")
        out_directory = os.path.join(tmp_dirname, "dist", "apps", "export-site", "exported")
        exported_assets_out_directory = os.path.join(out_directory, "assets")
        assets = os.path.join(tmp_dirname, "dist", "apps", "export-site", "public", "assets")
        shutil.copytree(assets, exported_assets_out_directory, symlinks=True)
        zip_file = open(shutil.make_archive(zip_name, 'zip', out_directory), 'rb')
        return zip_file
