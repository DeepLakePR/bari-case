"use client";

import { Flex, Skeleton } from "antd";

type LoadingScreenProps = {
    label?: string;
};

export default function LoadingScreen({ label = "Carregando" }: LoadingScreenProps) {
    return (
        <main className="mx-auto flex max-w-[100rem] flex-col rounded-lg bg-white p-8">
            <div className="rounded-t-xl py-4 pt-0">
                <Skeleton.Input active size="default" style={{ width: 220, height: 28 }} />

                <div className="my-4">
                    <Skeleton.Input active size="small" style={{ width: "100%", height: 16 }} />
                </div>

                <Flex justify="space-between" align="center">
                    <div className="flex gap-4">
                        <Skeleton.Input active size="default" style={{ width: 200 }} />
                        <Skeleton.Input active size="default" style={{ width: 160 }} />
                    </div>

                    <Skeleton.Button active size="default" style={{ width: 140 }} />
                </Flex>
            </div>

            <div className="rounded-b-xl py-4 pt-0">
                <Skeleton
                    active
                    title={false}
                    paragraph={{
                        rows: 6,
                        width: ["100%", "100%", "100%", "100%", "100%", "100%"],
                    }}
                />
            </div>

            <span className="sr-only" aria-live="polite">
                {label}
            </span>
        </main>
    );
}
